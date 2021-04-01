import React, {useState} from 'react';

const QuestionPair = ({PrimaryComponent, SecondaryComponent, ...rest}) => {
  const [primaryVisible, setPrimaryVisible] = useState(true);
  if (primaryVisible) {
    return (
      <PrimaryComponent
        {...rest}
        primary={false}
        goToSecondary={() => setPrimaryVisible(false)}
      />
    );
  } else {
    return <SecondaryComponent {...rest} />;
  }
};

export default QuestionPair;
