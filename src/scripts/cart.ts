interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

class Cart {
  private items: CartItem[] = [];
  private modal: HTMLElement | null;
  private overlay: HTMLElement | null;
  private toggleButton: HTMLElement | null;
  private countBadge: HTMLElement | null;

  constructor() {
    this.modal = document.getElementById('cart-modal');
    this.overlay = document.getElementById('cart-overlay');
    this.toggleButton = document.getElementById('cart-toggle');
    this.countBadge = document.getElementById('cart-count-badge');

    this.loadCart();
    this.setupEventListeners();
    this.updateCartCountBadge();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCountBadge();
  }

  private setupEventListeners(): void {
    this.toggleButton?.addEventListener('click', () => this.openCart());
    this.overlay?.addEventListener('click', () => this.closeCart());
  }

  private updateCartCountBadge(): void {
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    if (this.countBadge) {
      this.countBadge.textContent = totalItems.toString();
      if (this.toggleButton) {
        this.toggleButton.style.display = totalItems > 0 ? 'flex' : 'none';
      }
    }
  }

  private openCart(): void {
    this.modal?.classList.add('active');
    this.overlay?.classList.add('active');
    this.renderCartItems();
  }

  private closeCart(): void {
    this.modal?.classList.remove('active');
    this.overlay?.classList.remove('active');
  }

  private renderCartItems(): void {
    if (!this.modal) return;

    if (this.items.length === 0) {
      this.renderEmptyCart();
      return;
    }

    this.modal.innerHTML = this.getCartHTML();
    this.setupCartEventListeners();
  }

  private renderEmptyCart(): void {
    if (!this.modal) return;

    this.modal.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has añadido productos a tu carrito.</p>
        <a href="/catalog" class="btn btn-primary">Explorar Catálogo</a>
      </div>
    `;
  }

  private getCartHTML(): string {
    let subtotal = 0;
    const itemsHTML = this.items.map((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      return this.getCartItemHTML(item, index, itemTotal);
    }).join('');

    return `
      <div class="cart-header">
        <h2 class="cart-title" id="cart-title">Tu Carrito de Compras</h2>
        <button class="cart-close" id="cart-close" aria-label="Cerrar carrito">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cart-items">
        ${itemsHTML}
      </div>
      ${this.getCartSummaryHTML(subtotal)}
    `;
  }

  private getCartItemHTML(item: CartItem, index: number, itemTotal: number): string {
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="/images/${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <p class="cart-item-price">S/ ${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-index="${index}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-index="${index}" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }

  private getCartSummaryHTML(subtotal: number): string {
    const shipping = 10;
    const total = subtotal + shipping;

    return `
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>S/ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Envío</span>
          <span>S/ ${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <span>S/ ${total.toFixed(2)}</span>
        </div>
      </div>
      <div class="checkout-section">
        <h3 class="checkout-title">Finalizar Pedido</h3>
        <button class="whatsapp-button" id="whatsapp-checkout">
          <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
        </button>
        <button class="email-button" id="email-checkout">
          <i class="fas fa-envelope"></i> Enviar por Email
        </button>
        <button class="clear-cart" id="clear-cart">Vaciar carrito</button>
      </div>
    `;
  }

  private setupCartEventListeners(): void {
    const closeBtn = this.modal?.querySelector('#cart-close');
    closeBtn?.addEventListener('click', () => this.closeCart());

    this.modal?.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt((btn as HTMLElement).dataset.index || '0');
        this.decreaseQuantity(index);
      });
    });

    this.modal?.querySelectorAll('.quantity-btn.increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt((btn as HTMLElement).dataset.index || '0');
        this.increaseQuantity(index);
      });
    });

    this.modal?.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt((btn as HTMLElement).dataset.index || '0');
        this.removeItem(index);
      });
    });

    const whatsappBtn = this.modal?.querySelector('#whatsapp-checkout');
    whatsappBtn?.addEventListener('click', () => this.sendWhatsAppOrder());

    const emailBtn = this.modal?.querySelector('#email-checkout');
    emailBtn?.addEventListener('click', () => this.sendEmailOrder());

    const clearCartBtn = this.modal?.querySelector('#clear-cart');
    clearCartBtn?.addEventListener('click', () => this.clearCart());
  }

  private increaseQuantity(index: number): void {
    if (this.items[index]) {
      this.items[index].quantity += 1;
      this.saveCart();
      this.renderCartItems();
    }
  }

  private decreaseQuantity(index: number): void {
    if (this.items[index] && this.items[index].quantity > 1) {
      this.items[index].quantity -= 1;
      this.saveCart();
      this.renderCartItems();
    }
  }

  private removeItem(index: number): void {
    this.items.splice(index, 1);
    this.saveCart();
    this.renderCartItems();
  }

  private clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
      this.items = [];
      this.saveCart();
      this.renderCartItems();
    }
  }

  private formatOrderMessage(): string {
    let message = 'Hola! Me interesa realizar el siguiente pedido en Zona Biker 15:%0A%0A';

    let subtotal = 0;
    this.items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      message += `${index + 1}. ${item.name}%0A   Cantidad: ${item.quantity}%0A   Precio: S/ ${item.price.toFixed(2)}%0A   Subtotal: S/ ${itemTotal.toFixed(2)}%0A%0A`;
    });

    const shipping = 10;
    const total = subtotal + shipping;

    message += `Resumen:%0ASubtotal: S/ ${subtotal.toFixed(2)}%0AEnvío: S/ ${shipping.toFixed(2)}%0ATOTAL: S/ ${total.toFixed(2)}%0A%0A`;
    message += 'Me gustaría saber:%0A- Qué métodos de pago aceptan (transferencia, efectivo, Yape, etc.)%0A- Cuánto tiempo tardaría en recibir mi pedido%0A- Si todos los productos están disponibles%0A%0A';
    message += 'Por favor, contáctame para confirmar mi pedido y coordinar el pago y entrega. ¡Gracias!';

    return message;
  }

  private sendWhatsAppOrder(): void {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío. No se puede enviar.');
      return;
    }

    const message = this.formatOrderMessage();
    window.open(`https://wa.me/51917025103?text=${message}`, '_blank');
  }

  private sendEmailOrder(): void {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío. No se puede enviar.');
      return;
    }

    const message = this.formatOrderMessage();
    window.open(`mailto:Gsegurityaslam@gmail.com?subject=Pedido%20de%20Zona%20Biker%2015&body=${message}`, '_blank');
  }

  // Public methods for adding/removing items
  public addItem(item: Omit<CartItem, 'quantity'>): void {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Cart();
});
