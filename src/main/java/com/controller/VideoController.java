package com.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Video;
import com.service.VideoService;
import com.util.MyFileUtils;

/**
 * SpringBoot读取配置文件 ConfigurableApplicationContext cac = //
 * SpringApplication.run(SpringbootPropertiesApplication.class, args);
 * 
 * @EnableConfigurationProperties(MyWebConfig.class)启用配置文件加载
 * 
 * @author 30255
 * 
 */
@Controller
@RequestMapping("video")
public class VideoController {

	@Resource
	VideoService videoService;

	@Resource
	private MyFileUtils myFileUtils;

	Integer rs;

	@RequestMapping("addVideo")
	@ResponseBody
	public Integer addVideo(@RequestParam("file") MultipartFile file,
			@RequestParam("ziFile") MultipartFile ziFile, Video video) {
		return videoService.addVideo(file, ziFile, video);
	}

	@RequestMapping("addVideo1")
	@ResponseBody
	public Integer addVideo1(@RequestParam("file") MultipartFile file,
			Video video) {
		return videoService.addVideo1(file, video);
	}

	@RequestMapping("queryVideoByC_id")
	@ResponseBody
	public List<Video> queryVideoByC_id(Integer c_id) {
		return videoService.queryVideoByC_id(c_id);
	}

	@RequestMapping("downloadVideo")
	public void download(String backName, String filePath,
			HttpServletResponse response) {
		videoService.download(backName, filePath, response);
	}
	
	// 查询某个课程下的所有视频
	@RequestMapping("queryByVideo")
	@ResponseBody
	public List<Map<String,Object>> queryByVideo(Integer c_id){
		return videoService.queryByVideo(c_id);
	}
}
