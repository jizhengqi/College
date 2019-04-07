package com.util;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfiguration {

	@Configuration
	public class ShiroConfig {
		@Bean
		public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
			System.out.println("ShiroConfiguration.shirFilter()");
			ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
			shiroFilterFactoryBean.setSecurityManager(securityManager);
			// 拦截器.
			Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
			// 配置不会被拦截的链接 顺序判断
			filterChainDefinitionMap.put("user/login", "anon");
			filterChainDefinitionMap.put("/css/**", "anon");
			filterChainDefinitionMap.put("/img/**", "anon");
			filterChainDefinitionMap.put("/js/**", "anon");
			filterChainDefinitionMap.put("/video/**", "anon");
			filterChainDefinitionMap.put("/webapp/userCourse.html", "authc");
			filterChainDefinitionMap.put("/webapp/center_doing.html", "authc");
			filterChainDefinitionMap.put("/webapp/center_done.html", "authc");
			filterChainDefinitionMap.put("/webapp/center_collection.html",
					"authc");
			filterChainDefinitionMap.put("/webapp/setting_ca.html", "authc");
			filterChainDefinitionMap.put("/webapp/setting_vip.html", "authc");
			filterChainDefinitionMap.put("/webapp/setting_jkb.html", "authc");
			filterChainDefinitionMap.put("/webapp/security.html", "authc");
			filterChainDefinitionMap.put("/webapp/setting_message.html",
					"authc");
			filterChainDefinitionMap.put("/webapp/ke_center.html", "authc");
			filterChainDefinitionMap.put("/webapp/ke_doing.html", "authc");
			filterChainDefinitionMap.put("/webapp/learn_center.html", "authc");
			filterChainDefinitionMap.put("/webapp/setting_user.html", "authc");
			filterChainDefinitionMap.put("/**", "authc");
			// 配置退出 过滤器,其中的具体的退出代码Shiro已经替我们实现了
			filterChainDefinitionMap.put("/logout", "logout");
			// <!-- 过滤链定义，从上向下顺序执行，一般将/**放在最为下边 -->:这是一个坑呢，一不小心代码就不好使了;
			// <!-- authc:所有url都必须认证通过才可以访问; anon:所有url都都可以匿名访问-->
			// 如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
			shiroFilterFactoryBean.setLoginUrl("/Login.html");
			// 登录成功后要跳转的链接
			shiroFilterFactoryBean.setSuccessUrl("/index.html");

			// 未授权界面;
			shiroFilterFactoryBean.setUnauthorizedUrl("/403");
			shiroFilterFactoryBean
					.setFilterChainDefinitionMap(filterChainDefinitionMap);
			return shiroFilterFactoryBean;
		}

		@Bean
		public UserRealm myShiroRealm() {
			UserRealm myShiroRealm = new UserRealm();
			return myShiroRealm;
		}

		@Bean
		public SecurityManager securityManager() {
			DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
			securityManager.setRealm(myShiroRealm());
			return securityManager;
		}
	}
}
