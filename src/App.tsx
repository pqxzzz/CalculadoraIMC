import React from "react";
import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import leftArrow from "./assets/leftarrow.png";
import GridItem from "./components/GridItem/GridItem";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState(0);
  // LEVEL QUE PRECISA EXIBIR
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      // Aplica a funcao e exibe apenas a categoria que se encaixa
      // seta o toShow para algum LEVEL!!!
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("digite todos os campos");
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <header className={styles.headerContainer}>
        <img src={poweredImage} alt="" width={150} />
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo
            veritatis cumque veniam, sint officiis exercitationem, neque ipsam
            sit.
          </p>

          <input
            type="number"
            placeholder="Digite a sua altura em m"
            value={heightField > 0 ? heightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            // v Para que quando ja tiver preenchido nao possa alterar os inputs, so se voltar
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso em Kg"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button
            onClick={handleCalculateButton}
            disabled={toShow ? true : false}
          >
            calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {/* Se nao tiver nenhum level mostra todos */}
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {/* se tiver um Level toShow mostra sua versao GRIDITEM Grande */}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrow} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
