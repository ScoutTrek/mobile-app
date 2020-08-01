import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
} from 'react-native';

import CNEditor, {
  CNToolbar,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import FormHeading from './Headings/FormHeading';

const defaultStyles = getDefaultStyles();

class App extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      ...defaultStyles,
      body: {fontSize: 14},
      heading: {fontSize: 16},
      title: {fontSize: 20},
      ol: {fontSize: 12},
      ul: {fontSize: 12},
      bold: {fontSize: 12, fontWeight: 'bold'},
    };

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
    };

    this.editor = null;
  }

  onStyleKeyPress = (toolType) => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag,
    });
  };

  onSelectedStyleChanged = (styles) => {
    this.setState({
      selectedStyles: styles,
    });
  };

  render() {
    const {heading} = this.props;
    return (
      <KeyboardAvoidingView
        style={{marginTop: 20, paddingBottom: 0}}
        behavior="padding">
        <FormHeading title={heading} />
        <View
          style={{
            flex: 1,
            margin: 16,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderColor: Colors.lightGray,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              borderWidth: 1,
            }}
            onTouchStart={() => {
              this.editor && this.editor.blur();
            }}>
            <View style={styles.main} onTouchStart={(e) => e.stopPropagation()}>
              <CNEditor
                placeholder="What do you want everyone to know about this event?"
                ref={(input) => (this.editor = input)}
                onSelectedTagChanged={this.onSelectedTagChanged}
                onSelectedStyleChanged={this.onSelectedStyleChanged}
                onValueChanged={(value) => {
                  this.props.setDescription(value);
                }}
                styleList={this.customStyles}
                initialHtml={this.props.description}
              />
            </View>
          </View>

          <View>
            <CNToolbar
              style={{
                height: 44,
                borderRadius: 0,
                borderTopWidth: 0,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
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
          {this.props.children && (
            <View style={{paddingTop: 20}}>{this.props.children}</View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    minHeight: 220,
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'stretch',
  },
  formHeading: {
    borderColor: Colors.orange,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    marginHorizontal: 20,
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
