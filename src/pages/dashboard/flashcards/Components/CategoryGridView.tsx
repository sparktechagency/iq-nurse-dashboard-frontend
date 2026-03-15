import { Card, Button, Row, Col, Badge } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { getCategoryColor, getCategoryIcon } from '../../../../utils/categoryColors';
import { nursingCategories } from '../../../../demo-data/flashcard-data';

interface CategoryGridViewProps {
  flashcards: any[];
  onCategoryClick: (cat: string) => void;
  onSubcategoryClick: (cat: string, sub: string) => void;
  onAddToCategory: (cat: string) => void;
}

export default function CategoryGridView({
  flashcards,
  onCategoryClick,
  onSubcategoryClick,
  onAddToCategory,
}: CategoryGridViewProps) {
  return (
    <Row gutter={[16, 24]}>
      {nursingCategories.map((category: { name: string; subcategories: string[] }) => {
        const color = getCategoryColor(category.name);
        const icon = getCategoryIcon(category.name);
        const count = flashcards.filter(c => c.category === category.name).length;

        return (
          <Col xs={24} sm={12} lg={8} key={category.name}>
            <Card
              hoverable
              style={{ height: '100%', borderColor: color }}
              bodyStyle={{ padding: 0 }}
            >
              <div
                style={{
                  background: color,
                  color: 'white',
                  padding: '20px 24px',
                  borderRadius: '8px 8px 0 0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 32 }}>{icon}</div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18 }}>{category.name}</h3>
                      <div style={{ opacity: 0.85 }}>{count} flashcards</div>
                    </div>
                  </div>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    style={{ color: 'white' }}
                    onClick={() => onCategoryClick(category.name)}
                  />
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <h4 style={{ marginBottom: 12, color: '#555', fontSize: 13, textTransform: 'uppercase' }}>
                  Subtopics
                </h4>

                {category.subcategories.map((sub: string) => {
                  const subCount = flashcards.filter(
                    c => c.category === category.name && c.subcategory === sub
                  ).length;

                  return (
                    <div
                      key={sub}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        marginBottom: 4,
                        borderRadius: 6,
                        transition: 'all 0.2s',
                      }}
                      className="hover:bg-gray-50"
                    >
                      <div>
                        <div>{sub}</div>
                        <Badge count={subCount} style={{ marginTop: 4 }} />
                      </div>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onSubcategoryClick(category.name, sub)}
                      />
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: '12px 24px', background: '#f9f9f9', borderTop: '1px solid #eee' }}>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => onAddToCategory(category.name)}
                  block
                >
                  Add Flashcard
                </Button>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}