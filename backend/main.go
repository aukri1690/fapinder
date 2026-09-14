package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand/v2"
	"net/http"
	"net/url"
	"os"

	"github.com/joho/godotenv"
)

type dmmResponse struct {
	Result struct {
		Items []struct {
			URL      string `json:"URL"`
			ImageURL struct {
				Large string `json:"large"`
			} `json:"imageURL"`
			Title string `json:"title"`
		} `json:"items"`
	} `json:"result"`
}

type ItemResponse struct {
	Title string `json:"title"`
	URL   string `json:"url"`
	Image string `json:"image"`
}

func fetchItem(w http.ResponseWriter, r *http.Request) {
	apiID := os.Getenv("DMM_API_ID")
	affiliateID := os.Getenv("DMM_AFFILIATE_ID")

	const hits = 100
	const maxOffset = 50000 - hits + 1

	offset := rand.IntN(maxOffset) + 1

	params := url.Values{}
	params.Set("api_id", apiID)
	params.Set("affiliate_id", affiliateID)
	params.Set("site", "FANZA")
	params.Set("service", "digital")
	params.Set("floor", "videoa")
	params.Set("hits", fmt.Sprint(hits))
	params.Set("offset", fmt.Sprint(offset))
	params.Set("sort", "rank")
	params.Set("output", "json")

	reqURL := "https://api.dmm.com/affiliate/v3/ItemList?" + params.Encode()

	resp, err := http.Get(reqURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	var data dmmResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(data.Result.Items) == 0 {
		http.Error(w, "no items found", http.StatusNotFound)
		return
	}

	items := make([]ItemResponse, 0, len(data.Result.Items))
	for _, item := range data.Result.Items {
		items = append(items, ItemResponse{
			Title: item.Title,
			URL:   item.URL,
			Image: item.ImageURL.Large,
		})
	}

	rand.Shuffle(len(items), func(i, j int) {
		items[i], items[j] = items[j], items[i]
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found, falling back to system env vars")
	}

	http.HandleFunc("/api/item", fetchItem)
	http.ListenAndServe(":8080", nil)
}