
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
    name: "Brigadeiro",
    description: "Clássico e amado por todos, feito com chocolate belga e muito amor 🍫",
    image: "/doces-lis/images/brigadeiro.jpeg"
  },
  {
    id: 2,
    name: "Morango",
    description: "Doce e delicado, com recheio cremoso e toque de leite em pó especial 🍓",
    image: "/doces-lis/images/morango.jpeg"
  },
  {
    id: 3,
    name: "Beijinho",
    description: "Tradicional combinação de coco com leite condensado, finalizado com carinho 🥥",
    image: "/doces-lis/images/beijinho.jpeg"
  },
  {
    id: 4,
    name: "Maracujá",
    description: "Irresistível trufa de maracujá com recheio cremoso e sabor tropical 🍈",
    image: "/doces-lis/images/maracuja.jpeg"
  }
];


const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
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
        description: "Por favor, escolha quantas trufas você deseja.",
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
    message += "\nObrigada!";
    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione algumas trufas ao seu pedido primeiro!",
        variant: "destructive"
      });
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/559991687776?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-lilac-50">
      {/* Header - Mobile First */}
      <div className="text-center py-4 px-3 sm:py-6 sm:px-4 lg:py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lilac-800 mb-1 sm:mb-2 font-poppins">
            Lis Doces
          </h1>
          <p className="text-lilac-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 font-light">
            Trufas caseiras feitas com amor 💜
          </p>

          {/* Social Links - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Button
              variant="outline"
              size="lg"
              className="border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex items-center justify-center gap-2 h-10 sm:h-11 text-sm sm:text-base"
              onClick={() => window.open('https://wa.me/559991687776', '_blank')}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              WhatsApp
            </Button>
            <Button

              variant="outline"
              size="lg"
              className="border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex items-center justify-center gap-2 h-10 sm:h-11 text-sm sm:text-base"
              onClick={() => window.open('https://instagram.com/doces_lisd', '_blank')}
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              Instagram
            </Button>
          </div>
        </div>
      </div>

      {/* Menu - Mobile First */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-44 sm:pb-48 lg:pb-64">
        <h2 className="text-xl sm:text-2xl font-semibold text-lilac-800 mb-2 sm:mb-3 text-center">
          Nosso Cardápio
        </h2>
        <span className="block text-base sm:text-lg text-lilac-700 mb-4 sm:mb-6 text-center font-medium">
          A partir de 5 doces realizamos a entrega em sua casa!
        </span>

        <div className="grid gap-3 sm:gap-4 lg:gap-6">
          {brigadeiros.map((brigadeiro) => (
            <Card key={brigadeiro.id} className="overflow-hidden border-lilac-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Image - Mobile Optimized */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-lilac-200 mx-auto sm:mx-0">
                    <img
                      src={brigadeiro.image}
                      alt={brigadeiro.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-lilac-800 text-base sm:text-lg mb-1">
                      {brigadeiro.name}
                    </h3>
                    <p className="text-lilac-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {brigadeiro.description}
                    </p>

                    {/* Controls - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex-shrink-0"
                          onClick={() => updateQuantity(brigadeiro.id, -1)}
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>

                        <span className="w-8 text-center font-medium text-lilac-800 text-sm sm:text-base">
                          {quantities[brigadeiro.id] || 0}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-lilac-300 text-lilac-700 hover:bg-lilac-100 flex-shrink-0"
                          onClick={() => updateQuantity(brigadeiro.id, 1)}
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>

                      <Button
                        onClick={() => addToCart(brigadeiro)}
                        className="bg-lilac-500 hover:bg-lilac-600 text-white px-4 sm:px-6 h-8 sm:h-10 text-sm sm:text-base w-full sm:w-auto mt-2 sm:mt-0"
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
        <span className="block text-base sm:text-lg text-lilac-700 mt-4 mb-4 sm:mb-6 text-center font-medium">
          Novos Sabores em Breve!
        </span>
      </div>

      {/* Fixed Cart Footer - Mobile First */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-lilac-200 p-3 sm:p-4 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <div className="mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm text-lilac-600 mb-1 sm:mb-2">Seu pedido:</p>
              <div className="space-y-0.5 sm:space-y-1 max-h-16 sm:max-h-20 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-lilac-700 truncate pr-2">
                      {item.quantity}x {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={sendToWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">
                Realizar Pedido ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
