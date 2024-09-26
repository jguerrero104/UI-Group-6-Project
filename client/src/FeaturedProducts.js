function FeaturedProducts() {
    const products = [
      { name: 'Smartphone X', price: '$799' },
      { name: 'Laptop Pro', price: '$1,299' },
      { name: 'Wireless Earbuds', price: '$199' },
    ];
  
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <h3 className="text-xl">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default FeaturedProducts;
  