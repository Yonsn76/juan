interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

class Cart {
  private items: CartItem[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.dispatchUpdate();
  }

  private load() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        this.items = JSON.parse(stored);
      } catch {
        this.items = [];
      }
    }
  }

  private dispatchUpdate() {
    const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: totalQuantity }));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: this.items }));
  }

  getItems() {
    return this.items;
  }

  addItem(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.save();
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.save();
      }
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

const cart = new Cart();

export default cart;
