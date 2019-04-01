package com.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:dir.properties")
@ConfigurationProperties
public class MyWebConfig {

	private String videoDir;

	private String picDir;

	/**
	 * 从配置文件中读取视频上传路径
	 * 
	 * @return
	 */
	public String getVideoDir() {
		return videoDir;
	}

	public void setVideoDir(String videoDir) {
		this.videoDir = videoDir;
	}

	/**
	 * 从配置文件中获取图片上传路径
	 * 
	 * @return
	 */
	public String getPicDir() {
		return picDir;
	}

	public void setPicDir(String picDir) {
		this.picDir = picDir;
	}

}
