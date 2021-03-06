package com.util;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.service.UsersService;

public class UserRealm extends AuthorizingRealm {

	@Resource
	UsersService userService;

	@SuppressWarnings("unused")
	private Logger logger = Logger.getLogger(UserRealm.class);

	/**
	 * 提供用户信息，返回权限信息
	 * 
	 * @param principals
	 * @return
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		return null;
	}

	/**
	 * 提供帐户信息，返回认证信息
	 * 
	 * @param authenticationToken
	 * @return
	 * @throws AuthenticationException
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {
		// 获取用户的输入的账号.
		String username = (String) token.getPrincipal();
		// 通过username从数据库中查找 User对象，如果找到，没找到.
		// 实际项目中，这里可以根据实际情况做缓存，如果不做，Shiro自己也是有时间间隔机制，2分钟内不会重复执行该方法
		// Users userInfo = userService.queryLog(username);
		if (!userService.checkUserName(username)) {
			throw new UnknownAccountException("无此用户名！");
		}
		String pwd = userService.getPassword(username);
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
				username, // 用户名
				pwd, // 密码
				getName() // realm name
		);
		return authenticationInfo;

	}
}
