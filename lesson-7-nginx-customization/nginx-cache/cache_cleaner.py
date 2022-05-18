import sys
import hashlib
import argparse
import os

PATH_TO_CACHE = "/tmp/nginx_cache"


def get_request_uri(command_args):
    parser = argparse.ArgumentParser()
    parser.add_argument('--request_uri', help='request uri')
    args = parser.parse_args()
    request_uri = args.request_uri
    return request_uri


def format_uri(uri):
    uri_parts = filter(lambda uri_item: uri_item != 'purge', uri.split('/'))
    formatted_uri = '/'.join(uri_parts)
    return formatted_uri


def hash_uri(uri):
    hashed_uri = hashlib.md5(uri.encode('utf-8')).hexdigest()
    return hashed_uri


def get_all_cache_files():
    return os.listdir(PATH_TO_CACHE)


def get_cache_by_request_uri(uri):
    formatted_uri = format_uri(uri)
    hashed_uri = hash_uri(formatted_uri)
    all_files = get_all_cache_files()
    cache_file = next((file for file in all_files if file == hashed_uri), None)
    return cache_file


def purge_cache(cache_file):
    path = os.path.join(PATH_TO_CACHE, cache_file)
    if os.path.isfile(path):
        os.remove(path)
    else:
        print("Error: %s file not found" % path)


def main(command_args):
    request_uri = get_request_uri(command_args)
    print('Request cache for purge %s' % request_uri)
    cache = get_cache_by_request_uri(request_uri)
    if cache:
        purge_cache(cache)
        print('Cache successful purged for uri %s' % request_uri)



if __name__ == '__main__':
    print('Python %s on %s' % (sys.version, sys.platform))
    main(sys.argv)