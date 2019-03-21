package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * springboot启动项:java最外层
 * 
 * @author JZQ
 * 
 */
@SpringBootApplication
@EnableAsync
public class SpringBootApplicationStart {
	public static void main(String[] args) {
		SpringApplication.run(SpringBootApplicationStart.class, args);
	}
}
