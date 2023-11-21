import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // 在这里执行发送重置密码链接的操作，使用 email 变量发送请求或调用相应的函数
    console.log(`Reset password request for email: ${email}`);
    // 你可以在这里调用 API 或其他函数来发送重置密码的请求
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
