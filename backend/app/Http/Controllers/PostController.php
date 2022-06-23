<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Exception;


use Intervention\Image\ImageManagerStatic as Image;

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

            $this->validate($request, [
                'title' => 'required',
                'author' => 'required',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'richText' => 'required',
            ]);

            $img = "";
            if ($request->hasFile('image')) {
                $fileName = $request->file('image')->getClientOriginalName();
                $finalName = date('His') . $fileName;
                $img = $request->file('image')->storeAs('posts', $finalName);
            }


            $newPosts = [
                'title' =>  $request['title'],
                'author' => $request['author'],
                'image' => $img,
                'richText' => $request['richText']
            ];

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

            $this->validate($request, [
                'title' => 'required',
                'author' => 'required',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'richText' => 'required',
            ]);

            $post = Post::find($id);

            if (!$post) return response()->json(['message' => 'Post not found']);

            // proceed if the post is already find.
            if ($request->hasFile('image')) {
                $fileName = $request->file('image')->getClientOriginalName();
                $finalName = date('His') . $fileName;
                $path = $request->file('image')->storeAs('posts', $finalName);
                $post->image = $path;
            }

            $post->title = $request->title;
            $post->author = $request->author;
            $post->richText = $request->richText;

            $post->save();


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
