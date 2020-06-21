import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress'

class Fileuploader extends Component 
{
    state = 
    {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    handleUploadStart = () => 
    {
        this.setState(
        {
            isUploading: true
        })
    }

    handleUploadError = () => 
    {
        this.setState(
        {
            isUploading: false
        })
    }

    // filename will be received as an argument from the firebase. filename means name of the image.
    handleUploadSuccess = filename => 
    {
        console.log(filename);

        this.setState(
        {
            name: filename,
            isUploading: false
        });

        // It is used to download the url of the image which will contain url + name of the image + token in the same order. It will
        // download the url from the lcoation where the image is saved i.e from the storage of the firebase.
        firebase.storage().ref(this.props.dir).child(filename).getDownloadURL()
        .then(url => 
        {
            console.log("firebase.js url",url);

            this.setState({fileURL: url })
        })

        this.props.filename(filename);
    }

    static getDerivedStateFromProps(props,state)
    {
        if( props.defaultImgURL )
        {
            return state = 
            {
                name: props.defaultImgName,
                fileURL: props.defaultImgURL
            }
        }
        
        return null;
    }

    removeImageHandler = () => 
    {
        firebase.storage().ref('players').child(this.state.name).delete()
        .then(() =>
        {
            console.log("Image deleted successfully");
        })
        .catch(error =>
        {
            console.log("Image can't be deleted",error);
        })

        this.setState(
        {
            name: '',
            isUploading:false,
            fileURL: ''
        });

        this.props.resetImage();
    }

    render() 
    {
        return (
            <div>
                { 
                    !this.state.fileURL ?
                        <div>
                            <div className="label_inputs">{ this.props.tag }</div>
                            <FileUploader
                                accept="image/*"
                                name="image"
                                
                                // randomizeFilename is used to give the random names to the file and will overwrite the original name
                                // of the image. So if it mentioned then image will be given a random name ( hashed ).
                                // randomizeFilename

                                storageRef = { firebase.storage().ref(this.props.dir) }
                                onUploadStart = { this.handleUploadStart }
                                onUploadError = { this.handleUploadError }
                                onUploadSuccess = { this.handleUploadSuccess }
                            />
                        </div>
                    :
                        <div className="image_upload_container">
                            <img
                                style = {{ width:'100%' }}
                                src = { this.state.fileURL }
                                alt = { this.state.name }
                            />
                            <div 
                                className="remove" 
                                onClick = { () => this.removeImageHandler() }
                                style = {{ cursor: "pointer" }}> Remove
                            </div>
                        </div>
                }
                
                { 
                    this.state.isUploading ?
                        <div 
                            className="progress"
                            style = {{ textAlign:'center', margin:'30px 0' }}
                        >
                            <CircularProgress
                                style = {{ color:'#98c6e9' }}
                                thickness = { 7 }
                            />
                        </div>
                    :
                        null
                }

            </div>
        );
    }
}

export default Fileuploader;