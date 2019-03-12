package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dao.VideoDao;
import com.entity.Video;
import com.util.MyFileUtils;

@Service
@Transactional
public class VideoService {

	@Resource
	VideoDao videoDao;

	@Resource
	MyFileUtils myFileUtils;

	public Integer addVideo(@RequestParam("file") MultipartFile file,
			@RequestParam("ziFile") MultipartFile ziFile, Video video) {
		if (file.isEmpty() || ziFile.isEmpty()) {
			return 0;
		}
		try {
			String[] uploadPaths = myFileUtils.uploads(file, ziFile);
			// 将视频路径和资料路径上传到数据库
			video.setV_url(uploadPaths[0]);
			video.setV_data_url(uploadPaths[1]);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 执行添加视频详细信息到数据库
		return videoDao.addVideo(video);
	}

	public Integer addVideo1(@RequestParam("file") MultipartFile file,
			Video video) {
		if (file.isEmpty()) {
			return 0;
		}
		try {
			// 将视频上传到本地磁盘
			String uploadPath = myFileUtils.upload(file);
			// 将视频路径添加到数据库
			video.setV_url(uploadPath);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 执行添加视频详细信息到数据库
		return videoDao.addVideo(video);
	}

	public List<Video> queryVideo(Integer v_id) {
		return videoDao.queryVideo(v_id);
	}
}
