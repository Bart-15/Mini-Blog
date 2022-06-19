<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Exception;

class PostController extends Controller
{
    //
    // Fetch all posts;
    public function index()
    {
        return Post::all();
    }

    // create post
    public function store(Request $request)
    {
        try {
            $newPosts = $this->validate($request, [
                'title' => 'required',
                'author' => 'required',
                'richText' => 'required',
                'image' => 'required'
            ]);

            return Post::create($newPosts);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }


    public function show($id)
    {
        try {
            $post = Post::find($id);

            if (!$post) return response()->json(['message' => 'Post not found.']);

            return $post;
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // dd($request->title);
            $post = Post::find($id);

            if (!$post) return response()->json(['message' => 'Post not found']);

            // proceed if the post is already find.
            $updatedPost = $this->validate($request, [
                'title' => 'required',
                'author' => 'required',
                'richText' => 'required',
                'image' => 'required'
            ]);

            $post->update($updatedPost);

            return response()->json(['success' => 'Post updated successfully']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Post::find($id);

            if (!$post) return response()->json(['message' => 'Post not found'], 404);

            // delete
            $post->delete();
            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
