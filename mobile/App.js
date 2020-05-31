import { registerRootComponent } from "expo";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import "./page/init"; //loading  and  register components

import { getTypes } from "./page/decorator";


registerRootComponent(
  createAppContainer(
    createSwitchNavigator(
      getTypes().reduce(
        (screens, { Component, name }) => ({
          ...screens,
          [name]: {
            screen: Component,
          },
        }),
        {}
      )
    )
  )
);
