import { tweetsDatas } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let tweetsData = tweetsDatas
if(localStorage.getItem('tweetsData-abdel')){
    tweetsData = JSON.parse(localStorage.getItem('tweetsData-abdel'))
}
const tweetInput = document.getElementById('tweet-input')


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if(e.target.dataset.replyTweet){
        handleReplyUserClick(e.target.dataset.replyTweet)
    } else if(e.target.dataset.delete){
        handleDeleteClick(e.target.dataset.delete)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})

function handleDeleteClick(tweetId){
    const targetTweetIndex = tweetsData.findIndex(function(tweet){
        return tweet.uuid === tweetId
    })
    tweetsData.splice(targetTweetIndex, 1)
    render()
}

function handleReplyUserClick(replyTweet) {
    if(!tweetInput.value){
        return
    }

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === replyTweet
    })[0]
    targetTweetObj.replies.push({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        tweetText: tweetInput.value
    })
    render()
    tweetInput.value = ''
}


function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``

    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic" alt="Profile picture.">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }
        
          
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic" alt="Profile picture.">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-reply" data-reply-tweet="${tweet.uuid}"></i>
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-trash" data-delete="${tweet.uuid}"></i>
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>   
        </div>
        `
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    localStorage.setItem('tweetsData-abdel', JSON.stringify(tweetsData));
}

render()

