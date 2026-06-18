import { useState } from 'react';
import { GroceryItem } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart, Apple, Milk, Wheat, Package, Sparkles,
  Plus, Pencil, Trash2, Check, X,
} from 'lucide-react';

interface GroceryListViewProps {
  items: GroceryItem[];
  onToggle: (name: string) => void;
  onAdd: (item: GroceryItem) => void;
  onEdit: (oldName: string, updatedItem: GroceryItem) => void;
  onDelete: (name: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  produce: <Apple className="w-4 h-4" />,
  dairy: <Milk className="w-4 h-4" />,
  protein: <Package className="w-4 h-4" />,
  grains: <Wheat className="w-4 h-4" />,
  pantry: <Package className="w-4 h-4" />,
  spices: <Sparkles className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  produce: 'Fresh Produce',
  dairy: 'Dairy & Alternatives',
  protein: 'Protein',
  grains: 'Grains & Bread',
  pantry: 'Pantry Staples',
  spices: 'Spices & Seasonings',
};

const categoryColors: Record<string, string> = {
  produce: 'bg-success/20 text-success-foreground',
  dairy: 'bg-secondary',
  protein: 'bg-accent',
  grains: 'bg-breakfast',
  pantry: 'bg-muted',
  spices: 'bg-dinner',
};

const CATEGORIES = ['produce', 'protein', 'dairy', 'grains', 'pantry', 'spices'] as const;

export function GroceryListView({ items, onToggle, onAdd, onEdit, onDelete }: GroceryListViewProps) {
  // --- Add-item form state ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('1');
  const [newUnit, setNewUnit] = useState('');
  const [newCategory, setNewCategory] = useState<GroceryItem['category']>('produce');

  // --- Inline-edit state ---
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editQty, setEditQty] = useState('');
  const [editUnit, setEditUnit] = useState('');

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const totalItems = items.length;
  const checkedItems = items.filter(i => i.checked).length;

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAdd({
      name: trimmed,
      quantity: parseFloat(newQty) || 1,
      unit: newUnit.trim() || 'pcs',
      category: newCategory,
      checked: false,
    });
    // Reset form
    setNewName('');
    setNewQty('1');
    setNewUnit('');
    setNewCategory('produce');
    setShowAddForm(false);
  };

  const startEdit = (item: GroceryItem) => {
    setEditingName(item.name);
    setEditName(item.name);
    setEditQty(String(item.quantity));
    setEditUnit(item.unit);
  };

  const cancelEdit = () => setEditingName(null);

  const saveEdit = (oldName: string, category: GroceryItem['category'], checked: boolean) => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    onEdit(oldName, {
      name: trimmed,
      quantity: parseFloat(editQty) || 1,
      unit: editUnit.trim() || 'pcs',
      category,
      checked,
    });
    setEditingName(null);
  };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif">Grocery List</h2>
            <p className="text-muted-foreground">Everything you need for the week</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-base px-4 py-2">
            {checkedItems} / {totalItems} items
          </Badge>
          <Button
            variant="soft"
            size="sm"
            onClick={() => setShowAddForm(prev => !prev)}
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Add-item form */}
      {showAddForm && (
        <Card variant="elevated" className="animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Name</label>
                <Input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Tomatoes"
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Qty</label>
                <Input
                  type="number"
                  min="0"
                  step="0.25"
                  value={newQty}
                  onChange={e => setNewQty(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Unit</label>
                <Input
                  value={newUnit}
                  onChange={e => setNewUnit(e.target.value)}
                  placeholder="pcs"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as GroceryItem['category'])}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{categoryLabels[c]}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button variant="hero" size="sm" onClick={handleAdd} className="flex-1">
                  <Plus className="w-4 h-4" /> Add
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full gradient-primary transition-all duration-500 rounded-full"
          style={{ width: `${totalItems > 0 ? (checkedItems / totalItems) * 100 : 0}%` }}
        />
      </div>

      {/* Category cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <Card key={category} variant="elevated" className="overflow-hidden">
            <CardHeader className={`py-3 ${categoryColors[category]}`}>
              <CardTitle className="flex items-center gap-2 text-base">
                {categoryIcons[category]}
                {categoryLabels[category]}
                <Badge variant="secondary" className="ml-auto">
                  {categoryItems.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {categoryItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                      item.checked ? 'bg-muted/50' : 'hover:bg-secondary/50'
                    }`}
                  >
                    {editingName === item.name ? (
                      /* ---- Inline edit mode ---- */
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="h-8 text-sm flex-1"
                          onKeyDown={e => e.key === 'Enter' && saveEdit(item.name, item.category, item.checked)}
                        />
                        <Input
                          type="number"
                          value={editQty}
                          onChange={e => setEditQty(e.target.value)}
                          className="h-8 text-sm w-16"
                          min="0"
                          step="0.25"
                        />
                        <Input
                          value={editUnit}
                          onChange={e => setEditUnit(e.target.value)}
                          className="h-8 text-sm w-16"
                        />
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => saveEdit(item.name, item.category, item.checked)}>
                          <Check className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={cancelEdit}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      /* ---- Normal display mode ---- */
                      <>
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => onToggle(item.name)}
                          className="data-[state=checked]:bg-primary"
                        />
                        <span
                          className={`flex-1 ${
                            item.checked ? 'line-through text-muted-foreground' : ''
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {item.quantity} {item.unit}
                        </span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:!opacity-100" onClick={() => startEdit(item)}>
                          <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:!opacity-100" onClick={() => onDelete(item.name)}>
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
