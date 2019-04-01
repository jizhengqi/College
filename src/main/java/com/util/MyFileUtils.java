package com.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class MyFileUtils {

	/**
	 * 单文件上传
	 * 
	 * @param file
	 * @param path
	 * @return 文件名称
	 * @throws Exception
	 * @throws IllegalStateException
	 */
	public String upload(String path, MultipartFile file)
			throws IllegalStateException, Exception {
		// 解决中文问题,中文路径,视频显示问题
		String uploadPath = UUID.randomUUID()
				+ getSuffix(file.getOriginalFilename());
		// 创建路径
		File dest = new File(path + uploadPath);
		// 检测存放视频的文件夹是否存在
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
	public String[] uploads(String path, MultipartFile... file)
			throws IllegalStateException, Exception {
		int length = file.length;
		String[] uploadPaths = new String[length];
		for (int i = 0; i < length; i++) {
			uploadPaths[i] = upload(path, file[i]);
		}
		return uploadPaths;
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

	/**
	 * 单文件下载
	 * 
	 * @param backName
	 *            返回前台下载的文件名(中文处理)
	 * @param filePath
	 *            访问文件路径
	 * @param bis
	 *            输入流
	 * @param bos
	 *            输出流
	 * @param response
	 *            响应
	 */
	public void download(String backName, String filePath,
			BufferedInputStream bis, BufferedOutputStream bos,
			HttpServletResponse response) {
		response.setContentType("text/html;charset=UTF-8");// 设置返回中文编码格式
		backName = backName + getSuffix(filePath);// 获取返回文件名全称
		try {
			response.setContentType("application/x-msdownload;");// 设置响应头类型为下载
			response.setHeader("Content-disposition", "attachment; filename="
					+ new String(backName.getBytes("UTF-8"), "ISO8859-1"));// 设置返回文件名(避免中文乱码)
			response.setHeader("Content-Length",
					String.valueOf(new File(filePath).length()));// 避免出现安全警告
			bis = new BufferedInputStream(new FileInputStream(filePath));// 读取文件流
			bos = new BufferedOutputStream(response.getOutputStream());// 强制输出下载
			byte[] buff = new byte[2048];
			int len;
			while (-1 != (len = bis.read(buff, 0, buff.length))) {
				bos.write(buff, 0, len);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != bos)
					bos.close();
				if (null != bis)
					bis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 截取文件后缀<br>
	 * 例如：.jpg
	 * 
	 * @param fileName
	 *            文件全路径
	 * @return
	 */
	private static String getSuffix(String fileName) {
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * 检测父级目录是否存在
	 * 
	 * @param file
	 *            目录
	 */
	private static void checkDirectory(File file) {
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
	}

}
