
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  onSendToWhatsApp: () => void;
}

const CartSummary = ({ cart, onSendToWhatsApp }: CartSummaryProps) => {
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-lilac-200 p-4 shadow-lg">
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <p className="text-sm text-lilac-600 mb-2">Seu pedido:</p>
          <div className="space-y-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-lilac-700">{item.quantity}x {item.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={onSendToWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 text-lg flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Realizar Pedido ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
