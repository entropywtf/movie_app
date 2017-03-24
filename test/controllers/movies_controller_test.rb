require 'test_helper'
require 'json'

class Api::V1::MoviesControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  def setup
    sign_in User.first
  end

  def teardown
    sign_out :user
  end

  test "Should list index even for unauthorized users" do
    sign_out :user
    get :index, format: :json
    assert_response :success
    jdata = JSON.parse response.body
    assert jdata.any?{ |h| h["title"] == "Star Wars" }
  end

  test "Should create a new movie" do
    assert_difference 'Movie.count', 1 do
      post :create, params: { movie: {title: "Pulp Fiction",
        description: "Some description yo"} }, format: :json
    end
    assert_response :success
    assert_equal "Pulp Fiction", Movie.last.title
    jdata = JSON.parse response.body
    assert_equal "Pulp Fiction", jdata["title"]
  end

  test "Should not create a new movie if unauthorized" do
    sign_out :user
    assert_no_difference 'Movie.count' do
      post :create, params: { movie: {title: "Pulp Fiction",
        description: "Some description yo"} }, format: :json
    end
    assert_response :unauthorized
  end

  test "Should update a movie" do
    m = Movie.first
    assert_no_difference 'Movie.count' do
      put :update, params: { id: m.id, movie: { title: "Foobar" } },
        format: :json
    end
    assert_response :success
    jdata = JSON.parse response.body
    assert_equal "Foobar", Movie.find(m.id).title
  end

  test "Should not update a movie if unauthorized" do
    sign_out :user
    m = Movie.first
    assert_no_difference 'Movie.count' do
      put :update, params: { id: m.id, movie: { title: "Foobar" } },
        format: :json
    end
    assert_response :unauthorized
  end

  test "Should show a movie" do
    get :show, params: { id: 2 }, format: :json
    assert_response :success
    jdata = JSON.parse response.body
    assert_equal "Beetlejuice", jdata["title"]
  end

  test "Should delete a movie" do
    assert_difference 'Movie.count', -1 do
      delete :destroy, params: { id: 1 }, format: :json
    end
    assert_response :success
    assert_not Movie.where(id: 1).present?
  end

  test "Should not delete a movie if unauthorized" do
    sign_out :user
    assert_no_difference 'Movie.count' do
      delete :destroy, params: { id: 1 }, format: :json
    end
    assert_response :unauthorized
  end

  test "Should search for movies with paginate" do
    post :search, params: { movie: { term: 'mytext', page: 1 } },
      headers: { 'Accept' => 'application/json' }, format: :json
    assert_response :success
    jdata = JSON.parse response.body
    assert_equal 4, jdata.size
    assert jdata.all?{|mh| mh["description"].match(/MyText/) }
  end
end
