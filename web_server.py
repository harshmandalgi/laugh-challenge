import SocketServer

PORT = 8080

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()

# -- Running (cd to file path)
# python -m SimpleHTTPServer 8080
