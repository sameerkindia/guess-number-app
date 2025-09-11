import StartGameScreen from "@/screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../constants/color";
import GameOverScreen from "../screens/GameOverScreen";
import GameScreen from "../screens/GameScreen";

const index = () => {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNum) {
    setUserNumber(pickedNum);
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setIsGameOver(false);
    setUserNumber(null);
    setGuessRounds(0);
  }


  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}
      >
        <SafeAreaView style={styles.rootScreen}>
          {/* <StartGameScreen /> */}
          {/* <GameScreen />
        <GameOverScreen /> */}

          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default index;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
