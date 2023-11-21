import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { Text, View } from '../../../components/Themed';


const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const appVersion = '1.0.0'; // 手动设置版本号

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (value === '') {
      setPhoneNumberError('手机号不能为空');
    } else if (!/^\d{0,11}$/.test(value)) {
      setPhoneNumberError('请输入正确的手机号');
    } else {
      setPhoneNumberError(value.length < 11 ? '请输入完整的手机号' : validatePhoneNumber(value) ? '' : '手机号不合法');
    }
  };

  const validatePhoneNumber = (value: string) => {
    const reg = /^1[3456789]\d{9}$/;
    return reg.test(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(value.length < 8 ? '请输入8位或以上字符' : '');
  };

  const handleLogin = async () => {
    if (phoneNumber === '') {
      setPhoneNumberError('手机号不能为空');
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('手机号不合法');
    }

    if (password.length < 8) {
      setPasswordError('请输入8位或以上字符');
    }

    if (phoneNumberError === '' && passwordError === '') {
      try {
        const response = await fetch('http://your-backend-url/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber, password }),
        });
  
        if (response.ok) {
          // 登录成功，根据后端返回的数据进行页面导航或其他操作
          const data = await response.json();
          console.log('登录成功', data);
  
          // 跳转到首页或其他页面
          // router.replace('/(tabs)');
        } else {
          // 登录失败，根据后端返回的错误信息提示用户
          const errorData = await response.json();
          Alert.alert('登录失败', errorData.message);
        }
      } catch (error) {
        // 请求失败，提示用户网络错误或其他信息
        console.error('登录请求失败:', error);
        Alert.alert('登录失败', '网络错误，请稍后再试');
      }
    } else {
      // 输入验证未通过，提示用户修正错误信息
      Alert.alert('登录失败', '请检查手机号和密码是否输入正确');
    }
  };

  const handleRegister = () => {
    // Navigate to registration page
    router.replace('/access/register');
    console.log('跳转到注册页面');
  };
  
  const handleForgotPassword = () => {
    // 此处可以是跳转至重置密码页面的导航操作，或者打开一个模态窗口让用户进行重置密码操作
    router.replace('/access/forgotPassword');
    console.log('跳转到忘记密码, 请联系客服或进入重置密码页面进行密码重置');
  };

  const handleContactSupport = () => {
    // 此处可以是打开模态窗口显示联系方式，或直接触发系统默认的联系方式
    // <AntDesign name="customerservice" size={24} color="black" />
    // Linking.openURL('tel:800-123-4567'); // 假设这里是联系客服的电话号码
    Linking.openURL('https://www.intercom.com/'); // 假设这里是在线聊天
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="请输入手机号"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
        />
        <View style={styles.errorText}>
          {phoneNumberError !== '' && (
            <Text style={{color: 'red' }}>{phoneNumberError}</Text>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="请输入密码"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <View style={styles.errorText}>
          {passwordError !== '' && (
            <Text style={{ color: 'red' }}>{passwordError}</Text>
          )}
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
          <Text >登录</Text>
        </TouchableOpacity>

        <View style={styles.registerForgotPasswordContainer}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>没有账号？</Text>
            <Link href="/Register" style={styles.linkText}>注册</Link>
          </View>
          <Link href="/ForgotPassword" style={styles.linkText}>忘记密码</Link>
        </View>

        <View style={styles.customerService}>
          <TouchableOpacity onPress={handleContactSupport}>
            <Text style={styles.customerServiceText}>联系客服</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>版本号：{appVersion}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F9AB80', // 设置背景颜色
  },
  loginContainer:{
    // backgroundColor: 'lightblue', // 设置背景颜色
    width: '80%',
    height: 400,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 50,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText:{
    // backgroundColor: '#F9AB88', // 设置背景颜色
    fontSize: 10,
    height: 25,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    height: 50,
  },
  registerForgotPasswordContainer:{
    // backgroundColor: 'red', // 设置背景颜色
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  registerContainer:{
    // backgroundColor: 'green', // 设置背景颜色
    flexDirection: 'row',
  },
  registerText:{
    color: 'gray',
    alignItems: 'center',
  },
  forgotPasseord:{
    // backgroundColor: 'green', // 设置背景颜色
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText:{
    color: 'blue',
  },
  customerService:{
    // backgroundColor: 'yellow', // 设置背景颜色
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  customerServiceText:{
    color: 'green',
  },
  versionText:{
    color: 'gray',
    marginTop: 20
  }
});

export default Login;