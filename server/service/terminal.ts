const pty = require('pty.js')
const sio = require('socket.io')
import { endpoint } from '../conf/config'
    
function fn(server)
{
    var tid = 0
    
    sio.listen(server).sockets.on('connection', function(socket)
    {
        socket.on('createTerminal', function(term_id, func)
        {
            console.log(term_id)
            var name = term_id.split('§')[0]
            var host_ip = term_id.split('§')[1]

            var cmd = ['-H', host_ip+':2375', 'exec', '-it', name, '/bin/bash'] 
            if( !process.env.PRODUCTION ){
                name = "hello-world" //'-H', host_ip+':2375', 
                cmd = ['exec', '-it', name, '/bin/bash']
            }
            term_id = tid++
            console.log('docker', cmd)
            var term = pty.spawn('docker', cmd, {cwd: '/'})
            // console.log('docker', ['-H', config.endpoint, 'exec', '-it', name, '/bin/bash'])
            .on('data', function(data){
                console.log(data)
                socket.emit('data'+ term_id, data)
            })
            .on('exit', function(){
                socket.emit('exit', {})
            })
            
            socket.on('data'+ term_id, function(data){ 
                term.write(data)
            })
            .on('resize'+term_id, function(data){
                console.log(data)
                term.resize(data.cols, data.rows)
            })
            .on('disconnect', function(){
                term.destroy()
            })
            
            func(term_id) 
        })
        
    })
}

export = fn

declare function require(name:string);
