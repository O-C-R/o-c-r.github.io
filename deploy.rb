require 'aws-sdk'

$s3 = Aws::S3::Client.new(region: 'us-east-1', profile: 'ocr')
$object_keys = {}

def put_object(filename, content_type)
	object_key = filename.gsub(/^_site\//, '')
	$object_keys[object_key] = true

	md5 = ''
	File.open(filename) do |file|
		md5 = Digest::MD5.base64digest(file.read)
	end

	begin
		puts "#{md5} /#{object_key}"
		resp = $s3.head_object({
			bucket: "ocr.nyc",
			key: object_key,
		})	

		if resp.metadata['md5'] == md5
			return
		end
	rescue Aws::S3::Errors::NotFound
	end

	puts "uploading #{filename}"
	resp = $s3.put_object({
		acl: 'private',
	  body: File.open(filename),
	  bucket: 'ocr.nyc',
	  content_md5: md5,
	  content_type: content_type,
	  key: object_key,
	  storage_class: 'REDUCED_REDUNDANCY',
	  metadata: {
	    'md5' => md5,
	  },
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

$s3.list_objects_v2(bucket: 'ocr.nyc').contents.each do |object|
	unless $object_keys[object.key] || object.key.start_with?('unequalfutures/')
		puts "deleting #{object.key}"
		# $s3.delete_object({
		# 	bucket: 'ocr.nyc',
		# 	key: object.key
		# })
	end
end
