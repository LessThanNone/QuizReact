"use client";

import { useState, useEffect } from "react";

type Drink = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
};

type CocktailResponse = {
  drinks: Drink[] | null;
};

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=espresso_martini";

function Footer() {
  return (
    <footer className="text-center text-muted p-4 mt-5" style={{ backgroundColor: "#f8f9fa" }}>
      <small>&copy; {new Date().getFullYear()} Kopi App</small>
    </footer>
  );
}

export default function ExploreCocktailPage() {
  const [drinkList, setDrinkList] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIngredients = (drink: Drink): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 8; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof Drink];
      const measure = drink[`strMeasure${i}` as keyof Drink];
      
      if (ingredient && typeof ingredient === 'string') {
        if (measure && typeof measure === 'string') {
          ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        } else {
          ingredients.push(ingredient.trim());
        }
      }
    }
    return ingredients;
  };

  useEffect(() => {
    const fetchCocktailData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Gagal mengambil data: Status ${response.status}`);
        }

        const data: CocktailResponse = await response.json();
        
        if (data.drinks && Array.isArray(data.drinks)) {
          setDrinkList(data.drinks);
        } else {
          setDrinkList([]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan tidak diketahui");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCocktailData();
  }, []);

  if (error) {
    return (
      <>
        <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
          <p className="text-center text-danger">Error: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4">Espresso Martini</h3>

        {drinkList.length === 0 ? (
          <p className="text-muted">Tidak ada data.</p>
        ) : (
          <div className="row g-4">
            {drinkList.map((drink) => {
              const ingredients = getIngredients(drink);
              
              return (
                <div key={drink.idDrink} className="col-12">
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={drink.strDrinkThumb}
                          className="img-fluid"
                          alt={drink.strDrink}
                          style={{ height: "100%", objectFit: "cover", minHeight: "250px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{drink.strDrink}</h5>
                          <p className="text-muted small mb-3">
                            {drink.strCategory} • {drink.strAlcoholic} • {drink.strGlass}
                          </p>

                          <h6 className="mb-2">Bahan:</h6>
                          <ul className="small mb-3">
                            {ingredients.map((ing, idx) => (
                              <li key={idx}>{ing}</li>
                            ))}
                          </ul>

                          <h6 className="mb-2">Cara membuat:</h6>
                          <p className="card-text small text-muted mb-0">
                            {drink.strInstructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <a href="/" className="text-decoration-none text-muted">← Kembali</a>
        </div>
      </div>

      <Footer />
    </>
  );
}