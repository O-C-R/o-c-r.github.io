all: _site

deploy: _site
	bundle exec ruby deploy.rb

_site:
	bundle exec jekyll build

clean:
	rm -rf _site

.PHONY: all deploy clean
