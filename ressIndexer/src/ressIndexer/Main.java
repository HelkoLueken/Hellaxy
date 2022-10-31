package ressIndexer;

import java.io.*;

public class Main {
	
	public static void createFolderIndex(String path){
		File folder = new File(path);
		File index = new File(path + "/.index.js");
		String folderName = path.split("/")[path.split("/").length - 1];
		
		try {
			FileWriter writer = new FileWriter(index);
			
			writer.write("var " + folderName + "Files = [\n");
			
			for (File file : folder.listFiles()) {
				if (index.getName().equals(file.getName())) continue;
				writer.write("\t\"");
				writer.write(file.getName());
				writer.write("\",\n");
			}
			
			writer.write("]");
			writer.flush();
			writer.close();
			System.out.println("Created index-file for folder: " + path);
		}
		catch (Exception e) {
			System.out.println(e);
		}
	}

	public static void main(String[] args) {
		createFolderIndex("../images");
		createFolderIndex("../audio");
	}

}