
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BrigadeiroItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface BrigadeiroCardProps {
  brigadeiro: BrigadeiroItem;
  quantity: number;
  onQuantityChange: (id: number, change: number) => void;
  onAddToCart: (brigadeiro: BrigadeiroItem) => void;
}

const BrigadeiroCard = ({ brigadeiro, quantity, onQuantityChange, onAddToCart }: BrigadeiroCardProps) => {
  return (
    <Card className="overflow-hidden border-lilac-200 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
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
                  onClick={() => onQuantityChange(brigadeiro.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <span className="w-8 text-center font-medium text-lilac-800">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-lilac-300 text-lilac-700 hover:bg-lilac-100"
                  onClick={() => onQuantityChange(brigadeiro.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={() => onAddToCart(brigadeiro)}
                className="bg-lilac-500 hover:bg-lilac-600 text-white px-6"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrigadeiroCard;
