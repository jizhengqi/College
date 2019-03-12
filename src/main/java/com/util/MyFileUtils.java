package com.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MyFileUtils {

	@Resource
	private MyWebConfig myWebConfig;

	/**
	 * 单文件上传
	 * 
	 * @param file
	 * @param path
	 * @return 文件名称
	 * @throws Exception
	 * @throws IllegalStateException
	 */
	public String upload(MultipartFile file) throws IllegalStateException,
			Exception {
		// 解决中文问题,中文路径,视频显示问题
		String uploadPath = UUID.randomUUID()
				+ getSuffix(file.getOriginalFilename());
		// 创建路径
		File dest = new File(myWebConfig.getVideoDir() + uploadPath);
		// 检测是否存在目录
		checkDirectory(dest);
		// 赋值文件到指定路径
		file.transferTo(dest);
		return uploadPath;
	}

	/**
	 * 多文件上传
	 * 
	 * @param file
	 * @param path
	 * @return
	 * @throws Exception
	 * @throws IllegalStateException
	 */
	public String[] uploads(MultipartFile[] file) throws IllegalStateException,
			Exception {
		int length = file.length;
		String[] uploadPaths = new String[length];
		for (int i = 0; i < length; i++) {
			uploadPaths[i] = upload(file[i]);
		}
		return uploadPaths;
	}

	/**
	 * 截取文件后缀<br>
	 * 例如：.jpg
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getSuffix(String fileName) {
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * 检测目录是否存在
	 * 
	 * @param file
	 */
	public static void checkDirectory(File file) {
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
	}

	/**
	 * 往文件中追加数据<br>
	 * FileWriter
	 * 
	 * @param path
	 * @param data
	 * @param encoding
	 * @return
	 */
	public static boolean writeToFile(String path, String data) {
		File file = new File(path);
		FileWriter fw = null;
		boolean flag = false;
		try {
			fw = new FileWriter(file, true);
			fw.write(data);
			fw.write("\r\n");
			flag = true;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fw.flush();
				fw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
		return flag;
	}

}
