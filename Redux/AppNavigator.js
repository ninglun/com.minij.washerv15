import {createStackNavigator, StackNavigator} from "react-navigation";
import React, { Component } from "react";
import ComponentMainPage from '../Main/ComponentMainPage';
import ComponentPowerCostPage from '../Main/ComponentPowerCostPage';
import ComponentWaterCostPage from '../Main/ComponentWaterCostPage';
import ComponentWashMenuPage from '../Main/ComponentWashMenuPage';
import ComponentMoreMenu from '../Main/ComponentMoreMenu';
import ComponentOrderPage from '../Main/ComponentOrderPage';
import {TitleBarWhite} from "miot/ui";

const AppNavigator = createStackNavigator(
    {
        ComponentMainPage:ComponentMainPage,
        ComponentWashMenuPage: ComponentWashMenuPage,
        ComponentPowerCostPage:ComponentPowerCostPage,
        ComponentWaterCostPage:ComponentWaterCostPage,
        ComponentMoreMenu:ComponentMoreMenu,
        ComponentOrderPage:ComponentOrderPage,
    }
    );

export default AppNavigator;
