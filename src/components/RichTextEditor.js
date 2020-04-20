import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const defaultStyles = getDefaultStyles();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
    };

    this.editor = null;
  }

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag,
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles,
    });
  };

  render() {
    const {description} = this.props;
    return (
      <View
        // behavior="padding"
        // enabled
        // keyboardVerticalOffset={0}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={input => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={description}
              styleList={defaultStyles}
              onValueChanged={this.props.setDescription}
            />
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            minHeight: 45,
          }}>
          <CNToolbar
            style={{
              height: 45,
            }}
            iconSetContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
            size={32}
            iconSet={[
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-bold" />
                    ),
                  },
                  {
                    toolTypeText: 'italic',
                    buttonTypes: 'style',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-italic" />
                    ),
                  },
                  {
                    toolTypeText: 'underline',
                    buttonTypes: 'style',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-underline" />
                    ),
                  },
                ],
              },
              {
                type: 'seperator',
              },
              {
                type: 'tool',
                iconArray: [
                  {
                    toolTypeText: 'body',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-text" />
                    ),
                  },
                  {
                    toolTypeText: 'title',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-header-1" />
                    ),
                  },
                  {
                    toolTypeText: 'heading',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-header-3" />
                    ),
                  },
                  {
                    toolTypeText: 'ul',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-list-bulleted" />
                    ),
                  },
                  {
                    toolTypeText: 'ol',
                    buttonTypes: 'tag',
                    iconComponent: (
                      <MaterialCommunityIcons name="format-list-numbered" />
                    ),
                  },
                ],
              },
            ]}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    minHeight: 200,
    padding: 10,
    alignItems: 'stretch',
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center',
  },
  italicButton: {
    fontStyle: 'italic',
  },
  boldButton: {
    fontWeight: 'bold',
  },
  underlineButton: {
    textDecorationLine: 'underline',
  },
});

export default App;
