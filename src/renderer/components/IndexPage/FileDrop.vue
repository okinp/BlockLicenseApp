<template>
    <div class="fullpage">
        <div class="upload text-center">
                <h1>Create your first licence</h1>
                <div id="filedrop">
                    <p class="upload-box">
                        <i class="fa fa-file-o"></i>
                        <span class="first-text">DRAG & DROP</span>
                        <span class="second-text">YOUR FILE</span>
                    </p>
                </div>
                <form action="#">
                    <div class="input-file-container">  
                        <input class="input-file" id="filebrowse" type="file">
                        <label tabindex="0" for="filebrowse" class="input-file-trigger">
                            <p class="browse">OR BROWSE HERE <i class="fa fa-folder-o"></i></p>
                        </label>
                    </div>
                    <p class="file-return"></p>
                </form>                
<!--                 <p class="browse">
                    OR BROWSE HERE <i class="fa fa-folder-o"></i>
                </p> -->
        </div>
    </div> 
</template>
<style lang="scss" scoped>
    *:focus {
        outline:none;
    }
    label {
        cursor: pointer;
    }
    #filebrowse {
        display: none;
    }
    .fullpage {
        width: 100%;
        height: 100%;
        flex-grow:1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .upload {
        > h1 {
            letter-spacing: normal;
            margin-bottom: 40px;
        }
        #filedrop {
            width: 280px;
            height: 280px;
            margin: 0 auto;
            p.upload-box{
                color: #D8DCE1;
                background: #EFF1F3;
                border: 6px dashed #D8DCE1;
                border-radius: 20px;
                padding: 60px 70px;
                width: 280px;
                margin: 0 auto;
                box-sizing: border-box;
                i {
                    font-size: 57px;
                    display: block;
                    color: inherit;
                }
                span {
                    display: inline-block;
                    font-weight: bold;
                    font-size: 12px;
                    &:first {
                        font-size: 14px;
                        margin-top: 10px;
                    }
                }
            }           
        }
        .browse{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            margin-top: 40px;
            color: #D8DCE1;
        }
    }
</style>
<script>
export default {
  name: 'file-drop',
  mounted: function(){
    var browseFile = document.querySelector(".input-file");
    browseFile.onchange = (ev) => {
        ev.preventDefault();
        var path = ev.path[0].files[0].path;
        console.log(path)
        this.$emit("filePath", path);
    }
    var dropArea = document.getElementById('filedrop');
    // var that = this;
    dropArea.ondrop = (ev) => {
        ev.preventDefault();
	    var items = ev.dataTransfer.items;
	    var file = items[0].getAsFile();
        alert(file.path);
        this.$emit("filePath", file.path);
    }
            
//            function(ev){
//		ev.preventDefault();
//		var items = ev.dataTransfer.items;
//		var file = items[0].getAsFile();
//        that.$emit("filePath", file.path);
//	};
      //	dropArea.ondrop = function(ev){
//		ev.preventDefault();
//		var items = ev.dataTransfer.items;
//		var file = items[0].getAsFile();
//        that.$emit("filePath", file.path);
//	};
	dropArea.ondragover = function(ev){
		ev.preventDefault();
        ev.dataTransfer.dropEffect = "copy";
	}
  }
}
</script>
