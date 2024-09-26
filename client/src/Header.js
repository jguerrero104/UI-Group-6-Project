function Header() {
    return (
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">"Placeholder"</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-yellow-300">Home</a></li>
              <li><a href="#" className="text-white hover:text-yellow-300">Products</a></li>
              <li><a href="#" className="text-white hover:text-yellow-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  