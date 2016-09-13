require 'aws-sdk'

$s3 = Aws::S3::Client.new

def put_object(filename, content_type)
	md5 = ''
	File.open(filename) do |file|
		md5 = Digest::MD5.base64digest(file.read)
	end

	puts "#{md5} #{filename}"
	resp = $s3.put_object({
		acl: 'private',
	  body: File.open(filename),
	  bucket: "ocr.nyc",
	  cache_control: 'max-age: 60',
	  content_md5: md5,
	  content_length: 1,
	  content_type: content_type,
	  key: filename.gsub(/^_site\//, ''),
	  storage_class: 'REDUCED_REDUNDANCY',
	})
end

Dir.glob('_site/**/*.ico') do |filename|
	put_object filename, 'image/x-icon'
end

Dir.glob('_site/**/*.png') do |filename|
	put_object filename, 'image/png'
end

Dir.glob('_site/**/*.jpg') do |filename|
	put_object filename, 'image/jpeg'
end

Dir.glob('_site/**/*.css') do |filename|
	put_object filename, 'text/css'
end

Dir.glob('_site/**/*.js') do |filename|
	put_object filename, 'application/javascript'
end

Dir.glob('_site/**/*.html') do |filename|
	put_object filename, 'text/html'
end

Dir.glob('_site/**/*.xml') do |filename|
	put_object filename, 'text/xml'
end
