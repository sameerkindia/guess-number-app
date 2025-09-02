import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import Title from "../components/ui/Title";

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

let minBoundary = 1;
let maxBoundry = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundry,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  
  useEffect(()=>{
    if(currentGuess === userNumber){
      onGameOver()
    }
  },[currentGuess])
  
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);

      return
    }

    if (direction === "lower") {
      maxBoundry = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundry,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
  }
  // const
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      {/* GUESS */}
      <View>
        <Text>Higher or lower</Text>
        <View>
          <PrimaryBtn onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryBtn>
          <PrimaryBtn onPress={nextGuessHandler.bind(this, "higher")}>
            +
          </PrimaryBtn>
        </View>
        {/* + - */}
      </View>
      <View>{/* Log rounds */}</View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
