package com.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dao.VideoDao;
import com.entity.Video;
import com.util.MyFileUtils;
import com.util.MyWebConfig;

@Service
@Transactional
public class VideoService {

	@Resource
	VideoDao vd;

	@Resource
	private MyWebConfig myWebConfig;

	// 添加视频详细信息
	public void add(Video v) {
		vd.add(v);
	}

	// 修改视频详细信息
	public void upd(Video v) {
		vd.upd(v);
	}

	// 删除视频详细信息
	public void del(Integer v_id) {
		vd.del(v_id);
	}

	// 查询某个视频详细信息
	public List<Video> queryById(Integer v_id) {
		return vd.queryById(v_id);
	}

	// 查询所有视频详细信息
	public List<Video> queryAll() {
		return vd.queryAll();
	}

	// 分页查询视频详细信息
	public List<Video> queryByPage(Integer page, Integer limit) {
		return vd.queryByPage(page, limit);
	}

	@Resource
	MyFileUtils myFileUtils;

	public Integer addVideo(@RequestParam("file") MultipartFile file,
			@RequestParam("ziFile") MultipartFile ziFile, Video video) {
		if (file.isEmpty() || ziFile.isEmpty()) {
			return 0;
		}
		try {
			String[] uploadPaths = myFileUtils.uploads(
					myWebConfig.getVideoDir(), file, ziFile);
			// 将视频路径和资料路径上传到数据库
			video.setV_url(uploadPaths[0]);
			video.setV_data_url(uploadPaths[1]);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 执行添加视频详细信息到数据库
		return vd.addVideo(video);
	}

	public Integer addVideo1(@RequestParam("file") MultipartFile file,
			Video video) {
		if (file.isEmpty()) {
			return 0;
		}
		try {
			// 将视频上传到本地磁盘
			String uploadPath = myFileUtils.upload(myWebConfig.getVideoDir(),
					file);
			// 将视频路径添加到数据库
			video.setV_url(uploadPath);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(video);
		// 执行添加视频详细信息到数据库
		return vd.addVideo(video);
	}

	// 根据课程ID获取所有视频
	public List<Video> queryVideoByC_id(Integer c_id) {
		return vd.queryVideoByC_id(c_id);
	}

	/**
	 * 下载视频
	 * 
	 * @param backName
	 * @param filePath
	 * @param response
	 */
	public void download(String backName, String filePath,
			HttpServletResponse response) {
		BufferedInputStream bis = null;// 输入流
		BufferedOutputStream bos = null;// 输出流
		String path = myWebConfig.getVideoDir() + filePath;// 拼接下载路径
		myFileUtils.download(backName, path, bis, bos, response);
	}

	// 查询某个课程下的所有视频
	public List<Map<String, Object>> queryByVideo(Integer c_id) {
		return vd.queryByVideo(c_id);
	}

	public void downloadZip(String backName, String filePath,
			HttpServletResponse response) {
		BufferedInputStream bis = null;// 输入流
		BufferedOutputStream bos = null;// 输出流
		String path = myWebConfig.getVideoDir() + filePath;// 拼接下载路径
		myFileUtils.download(backName, path, bis, bos, response);
	}
}
