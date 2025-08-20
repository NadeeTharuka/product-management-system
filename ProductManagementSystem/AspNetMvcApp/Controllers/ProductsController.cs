using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.Services;

namespace ProductManagementSystem.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _productService.GetCategoriesAsync();
            ViewBag.Categories = categories;
            return View();
        }
    }
}