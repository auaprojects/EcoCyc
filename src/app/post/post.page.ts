import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  posts = [
    {
      name: 'Color Code',
      title: '',
      description: 'Here is what the colors of the selective sorting bins correspond to.',
      date: _moment().format(),
      likes: 3,
      image: '../../assets/posts/waste-management.jpg',
      hasLiked: false
    },
    {
      name: 'Plastic Recycling',
      title: '',
      description: 'How Plastic is Recycled Using Wire Mesh Filters?',
      date: _moment().format(),
      likes: 3,
      image: '../../assets/posts/plastics-recycle.png',
      hasLiked: true
    },
    {
      name: 'Circular Economy',
      title: '',
      description: 'Resourceful in our waste management',
      date: _moment().format(),
      likes: 3,
      image: '../../assets/posts/circular-economy.jpg',
      hasLiked: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onLike(post) {

  }

  disLike(psot) {

  }

}
