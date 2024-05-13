import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

import { icons } from "../constants";

type SearchInputProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles: string;
  keyboardType?: string;
};

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
