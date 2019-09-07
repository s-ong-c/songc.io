---
title: 'Google Adsense 블로그 적용'
date: 2019-02-14 16:21:13
category: 'etc'
---

## GITHUB blog Google adsense 적용

> - 블로그 광고 삽입
> - 블로그로 돈벌기

- 들어가기 전

  - Google 이메일

  - 전제 조건: 이미 jekyll 테마 또는 hexo 등등으로 블로그 개설 상태
    - 가치가 있어야 한다
    - 많은 포스팅 갯수
    - 중복되지 않는 내용의 글

## Google Adsense 적용 하기

- Google Adsense 장점
  - 광고 빈도수로 인해서 금전을 확보 가능
  - Google Admob, Google Analytics와 묶여 앱 광고 플랫폼 Admob의 정보를 관리할 수 있다
  - Analytics로 유저의 페이지 접속빈도수를 같이 분석할 수 있다.

### 1. 구글 에드센스 가입

- Google adsense 접속

  ![](./images/adsense/adsense_1.png)

### 2. 구글 에드센스 승인

**제공하는 <script> 태그 삽입**

- [step 1] 제공하는 <script> 원하는 곳에 블로그 페이지 적용 후 신청 (승인 이메일이 올때까지 기다린다)

  ```html
  <script
    async
    src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  ></script>
  <script>
    ;(adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: 'ca-pub-########',
      enable_page_level_ads: true,
    })
  </script>
  ```

- [step 2] 승인이 허용되면
  - 이메일 확인
    ![](./images/adsense/adsense_3.png)

### 3. 광고 유형 선택하기

**Google AdSense가 제공하는 광고는 3가지 광고들로 나뉜다.**

![](./images/adsense/adsense_4.png)

- 텍스트& 이미지 , 인피드 , 콘텐츠내에 자동 삽입

- 선택후 코드생성 및 블로그 소스에 적용

  ![](./images/adsense/adsense_5.png)

  ```html
  <script
    async
    src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  ></script>
  <!-- PC_Bottom_auto -->
  <!-- head -->
  <ins
    class="adsbygoogle"
    style="display:inline-block;width:970px;height:90px"
    data-ad-client="ca-pub-#######"
    data-ad-slot="######"
  ></ins>
  <script>
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  </script>
  ```

### 4.블로그 적용하기

```html
<body>

 <input id="nm-switch" type="hidden" value="{{ site.nightMode }}">

{ include header.html }

<header class="g-banner post-header {{ site.postPatterns | prepend: 'post-pattern-' }} {{ site.theme-color | prepend: 'bgcolor-' }} {% unless page.cover %}post-no-cover{% endunless %}" data-theme="{{ site.theme-color }}">
    <div class="post-wrapper">
        <div class="post-tags">
            {% if page.tags.size > 0 %}
            {% for tag in page.tags  %}
            <a href="/tags#{{ tag }}" class="post-tag">{{ tag }}</a>
            {% endfor %}
            {% endif %}
        </div>
        <h1>{{ page.title }}</h1>
        <div class="post-meta">
            <span class="post-meta-item"><i class="iconfont icon-author"></i><a href="{{ site.url }}" target="_blank" rel="author">{% if page.author %}{{ page.author }}{% else %}{{ site.author }}{% endif %}</a></></span>
            <time class="post-meta-item" datetime="{{ page.date | date:"%y-%m-%d" }}"><i class="iconfont icon-date"></i>{{ page.date | date_to_string }}</time>
        </div>
    </div>
    {% if page.cover %}
    <div class="filter"></div>
    <div class="post-cover" style="background: url('{{ page.cover }}') center no-repeat; background-size: cover;">
    {% endif %}
</header>

{ include adsense_post_top.html }

{ include adsense_post_bottom.html }
```

#### 성공결과!!

![](./images/adsense/adsense_5.png)

# References

> - [구글에드센스 도움말](https://support.google.com/adsense#topic=33735190)
