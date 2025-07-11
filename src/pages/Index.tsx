
import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface BrigadeiroItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: number;
}

interface CartItem extends BrigadeiroItem {
  quantity: number;
}

const brigadeiros: BrigadeiroItem[] = [
  {
    id: 1,
    name: "Brigadeiro Tradicional",
    description: "Feito com chocolate belga e muito amor 🍫",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Leite Ninho",
    description: "Cremoso e irresistível, com leite em pó especial 🥛",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Pistache",
    description: "Sabor refinado com pistache importado 🌰",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "Morango com Nutella",
    description: "A combinação perfeita do doce com o achocolatado 🍓",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Beijinho de Coco",
    description: "Branquinho e delicado, com coco fresco 🥥",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 6,
    name: "Café Gourmet",
    description: "Para os amantes de café, intenso e aromático ☕",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop&crop=center"
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(12, (prev[id] || 0) + change))
    }));
  };

  const addToCart = (brigadeiro: BrigadeiroItem) => {
    const quantity = quantities[brigadeiro.id] || 1;
    if (quantity === 0) {
      toast({
        title: "Selecione uma quantidade",
        description: "Por favor, escolha quantos brigadeiros você deseja.",
        variant: "destructive"
      });
      return;
    }

    setCart(prev => {
      const existingItem = prev.find(item => item.id === brigadeiro.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === brigadeiro.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...brigadeiro, quantity }];
      }
    });

    toast({
      title: "Adicionado ao pedido! 🎉",
      description: `${quantity}x ${brigadeiro.name}`,
    });

    // Reset quantity selector
    setQuantities(prev => ({ ...prev, [brigadeiro.id]: 0 }));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer um pedido:\n\n";
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name}\n`;
    });
    message += "\nObrigada! 💜";
    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione alguns brigadeiros ao seu pedido primeiro!",
        variant: "destructive"
      });
      return;
    }
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-lilac-50">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-lilac-800 mb-2 font-poppins">
            Lis Doces
          </h1>
          <p className="text-lilac-600 text-lg mb-6 font-light">
            Brigadeiros caseiros feitos com amor 💜
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              variant="outline" 
              size="lg"
              className="border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex items-center gap-2"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex items-center gap-2"
              onClick={() => window.open('https://instagram.com/lisdoces', '_blank')}
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </Button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-2xl mx-auto px-4 pb-32">
        <h2 className="text-2xl font-semibold text-lilac-800 mb-6 text-center">
          Nosso Cardápio
        </h2>
        
        <div className="grid gap-6">
          {brigadeiros.map((brigadeiro) => (
            <Card key={brigadeiro.id} className="overflow-hidden border-lilac-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-lilac-200">
                    <img 
                      src={brigadeiro.image} 
                      alt={brigadeiro.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lilac-800 text-lg mb-1">
                      {brigadeiro.name}
                    </h3>
                    <p className="text-lilac-600 text-sm mb-4 leading-relaxed">
                      {brigadeiro.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-lilac-300 text-lilac-700 hover:bg-lilac-100"
                          onClick={() => updateQuantity(brigadeiro.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium text-lilac-800">
                          {quantities[brigadeiro.id] || 0}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-lilac-300 text-lilac-700 hover:bg-lilac-100"
                          onClick={() => updateQuantity(brigadeiro.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        onClick={() => addToCart(brigadeiro)}
                        className="bg-lilac-500 hover:bg-lilac-600 text-white px-6"
                      >
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fixed Cart Footer */}
      {cart.length > 0 && (
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
              onClick={sendToWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 text-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Realizar Pedido ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
