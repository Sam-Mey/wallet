import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [numericPassword, setNumericPassword] = useState(''); // 初始化为字符串类型
  const [waitTime, setWaitTime] = useState(600); // 10 minutes in seconds

  const handlePhoneNumberChange = (number: React.SetStateAction<string>) => {
    setPhoneNumber(number);
  };

  const handleVerificationCodeChange = (code: React.SetStateAction<string>) => {
    setVerificationCode(code);
  };

  const handlePasswordChange = (pwd: React.SetStateAction<string>) => {
    setPassword(pwd);
  };

  const handleNumericPasswordChange = (numericPwd: { toString: () => React.SetStateAction<string>; }) => {
    // 确保值为字符串类型
    setNumericPassword(numericPwd.toString());
  };
  
  const handleSendCode = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount >= 5) {
      setIsLimitExceeded(true);
      setIsCodeSent(false);
      setCountdown(waitTime);
      setIsCounting(true);
      return;
    }

    setIsCodeSent(true);
    setCountdown(1);
    setIsCounting(true); // 开始倒计时
    console.log('验证码已发送至:', phoneNumber);
  };

  // 设置密码逻辑
  const handleRegister = () => {
    console.log('手机号:', phoneNumber, '验证码:', verificationCode, '登录密码:', password, '支付密码:', numericPassword);
    // 实际注册逻辑，可以在这里处理
  };  

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isCounting) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 0) {
            clearInterval(timer);
            setIsCounting(false);
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  // 发送请求次数限制
  useEffect(() => {
    if (countdown === 0 && isLimitExceeded) {
      setIsLimitExceeded(false);
      setClickCount(0);
    }
    if (countdown !== 0 && isLimitExceeded) {
      let timer = setTimeout(() => {
        setCountdown((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isLimitExceeded]);

  return (
    <View>
      <Text>手机号码：</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
        placeholder="请输入手机号码"
      />
      {isCounting ? (
        <Text>{countdown}秒后{isCodeSent ? '重新发送验证码' : '发送验证码'}</Text>
      ) : (
        <Button
          title={isCodeSent ? '发送验证码' : '发送验证码'}
          onPress={handleSendCode}
          disabled={(isCodeSent && countdown !== 0) || isLimitExceeded}
        />
      )}
      {isLimitExceeded && (
        <Text>请勿频繁操作，{countdown}秒后再试。</Text>
      )}
      {isCodeSent && (
        <View>
          <Text>验证码：</Text>
          <TextInput
            value={verificationCode}
            onChangeText={handleVerificationCodeChange}
            keyboardType="numeric"
            placeholder="请输入验证码"
          />
          <Text>密码：</Text>
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            placeholder="请输入8位或以上密码"
          />
          <Text>纯数字密码：</Text>
          <TextInput
            value={numericPassword}
            onChangeText={handleNumericPasswordChange}
            keyboardType="numeric"
            placeholder="请输入 6 位纯数字密码"
          />
          <Button title="注册" onPress={handleRegister} />
        </View>
      )}
    </View>
  );
};

export default Register;
function setNumericPassword(numericPwd: any) {
  throw new Error('Function not implemented.');
}

