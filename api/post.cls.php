<?php
require_once('conn.php');

define('TBL_POSTS', 'edu_10_posts');
define('TBL_DATA', 'edu_10_postmeta');

class Card {
    private $conn;
    public $id;
    public $first_name;
    public $last_name;
    public $photo;
    public $photo_path;
    public $description;
    public $city;
    public $state;
    public $country;
    public $background_color;
    public $area_of_interest;
    public $vortex_system_likes;
    public $total_posts;

    public function __construct($conn, $id=NULL) {
        $this->conn = $conn;

        $this->total_posts = Card::count_all($this->conn);

        if (!empty($id))
            $this->fill_data($id);

        return $this;
    }

    public static function count_all($conn, $since=NULL) {
        $stmt = sprintf("
            SELECT COUNT(*) as count
            FROM %s
            WHERE post_type='%s'
            AND post_status='publish'%s;",
            TBL_POSTS, 'possible-card', Card::gen_since_query($since));
        $res = $conn->query($stmt)->fetch();

        return $res['count'];
    }

    public static function get_top($conn, $field, $num=5, $since=NULL) {
        $result = array();
        $stmt = sprintf("
            SELECT post_date_gmt, meta_value, COUNT(*) AS count
            FROM %s
            INNER JOIN %s
            ON %s.ID=%s.post_id
            WHERE post_status='publish'
            AND meta_key='%s'%s
            GROUP BY meta_value
            ORDER BY count DESC LIMIT %d;",
            TBL_POSTS, TBL_DATA, TBL_POSTS, TBL_DATA, $field, Card::gen_since_query($since), $num);
        $query = $conn->query($stmt);
        while ($row = $query->fetch()) {
            $result[$row['meta_value']] = $row['count'];
        }

        return $result;
    }

    public static function gen_since_query($since=NULL) {
        $res = '';
        if (!empty($since)) {
            $res = sprintf(" AND post_date_gmt>='%s'", date("Y-m-d H:i:s", $since));
        }
        return $res;
    }

    protected function get_photo() {
        if (empty($this->id) || empty($this->photo))
            return NULL;

        $stmt = sprintf("
            SELECT *
            FROM %s
            WHERE post_id=%d
            AND meta_key='_wp_attached_file'",
        TBL_DATA, $this->photo);
        $data = $this->conn->query($stmt)->fetch();
        if (empty($data))
            return NULL;
        return $data['meta_value'];
    }

    public function get_conn() {
        return $this->conn;
    }

    public function fill_data($id) {
        $this->id = $id;

        $stmt = sprintf("
            SELECT *
            FROM %s
            WHERE post_id=%d
            AND meta_key IN (
                'first_name',
                'last_name',
                'photo',
                'description',
                'city',
                'state',
                'country',
                'background_color',
                'area_of_interest',
                'vortex_system_likes'
            )",
            TBL_DATA, $id);
        $query = $this->conn->query($stmt);
        while ($row = $query->fetch()) {
            $this->{$row['meta_key']} = $row['meta_value'];
        }
        $this->photo_path = $this->get_photo();

        return $this;
    }

    public function get_latest() {
        $stmt = $this->conn->query(sprintf("
            SELECT ID
            FROM %s
            WHERE post_type='%s'
            AND post_status='publish'
            ORDER BY ID DESC
            LIMIT 1",
            TBL_POSTS, 'possible-card'));
        $post = $stmt->fetch();
        if (empty($post))
            return FALSE;

        return $this->fill_data($post['ID']);
    }
}
