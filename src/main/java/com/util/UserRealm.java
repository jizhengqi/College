package com.util;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
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
			AuthenticationToken authenticationToken)
			throws AuthenticationException {
		// 通过token获取用户账号
		String username = (String) authenticationToken.getPrincipal();
		return new SimpleAuthenticationInfo(username, "", getName());
	}
}
