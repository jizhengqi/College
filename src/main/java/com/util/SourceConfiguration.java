package com.util;

import javax.annotation.Resource;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SuppressWarnings("deprecation")
@Configuration
public class SourceConfiguration extends WebMvcConfigurerAdapter {

	@Resource
	MyWebConfig myWebConfig;

	/**
	 * /file/**:虚拟映射路径<br>
	 * "file:"+myWebConfig.getVideoDir():映射的真实路径
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/file/**").addResourceLocations(
				"file:" + myWebConfig.getVideoDir());
		registry.addResourceHandler("/files/**").addResourceLocations(
				"file:" + myWebConfig.getPicDir());
		super.addResourceHandlers(registry);
	}
}