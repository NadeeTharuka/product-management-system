using Newtonsoft.Json;
using ProductManagementSystem.Models;

namespace ProductManagementSystem.Services
{
    public class ProductService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiBaseUrl = "https://fakestoreapi.com";

        public ProductService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_apiBaseUrl}/products");
                
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var products = JsonConvert.DeserializeObject<List<Product>>(json);
                    return products ?? new List<Product>();
                }
                
                return new List<Product>();
            }
            catch (Exception)
            {
                return new List<Product>();
            }
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_apiBaseUrl}/products/{id}");
                
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<Product>(json);
                }
                
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<string>> GetCategoriesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_apiBaseUrl}/products/categories");
                
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var categories = JsonConvert.DeserializeObject<List<string>>(json);
                    return categories ?? new List<string>();
                }
                
                return new List<string>();
            }
            catch (Exception)
            {
                return new List<string>();
            }
        }

        public async Task<List<Product>> GetProductsByCategoryAsync(string category)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_apiBaseUrl}/products/category/{category}");
                
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var products = JsonConvert.DeserializeObject<List<Product>>(json);
                    return products ?? new List<Product>();
                }
                
                return new List<Product>();
            }
            catch (Exception)
            {
                return new List<Product>();
            }
        }
    }
}